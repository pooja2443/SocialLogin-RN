import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ListRenderItem,
} from 'react-native';
import Contacts, { Contact } from 'react-native-contacts';

const ContactsScreen: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      setIsLoading(true);
      const contactList = await Contacts.getAll();
      setContacts(contactList);
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading contacts:', error);
      Alert.alert(
        'Error',
        'Failed to load contacts. Please make sure permissions are granted.'
      );
      setIsLoading(false);
    }
  };

  const getInitials = (name: string): string => {
    if (!name) return '?';
    return name
      .split(' ')
      .map((n) => n?.[0] || '')
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const renderContactItem: ListRenderItem<Contact> = ({ item }) => {
    const displayName =
      item.displayName || `${item.givenName ?? ''} ${item.familyName ?? ''}`.trim();
    const phoneNumber =
      item.phoneNumbers && item.phoneNumbers.length > 0
        ? item.phoneNumbers[0].number
        : 'No phone number';

    return (
      <TouchableOpacity style={styles.contactCard}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>{getInitials(displayName)}</Text>
        </View>
        <View style={styles.contactInfo}>
          <Text style={styles.contactName}>{displayName}</Text>
          <Text style={styles.contactNumber}>{phoneNumber}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200ee" />
        <Text style={styles.loadingText}>Loading contacts...</Text>
      </View>
    );
  }

  if (contacts.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No contacts found on your device.</Text>
        <TouchableOpacity style={styles.refreshButton} onPress={loadContacts}>
          <Text style={styles.refreshButtonText}>Refresh</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.recordID}
        renderItem={renderContactItem}
        contentContainerStyle={styles.listContainer}
        refreshing={isLoading}
        onRefresh={loadContacts}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#616161',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  emptyText: {
    fontSize: 16,
    color: '#616161',
    textAlign: 'center',
    marginBottom: 20,
  },
  refreshButton: {
    backgroundColor: '#6200ee',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  refreshButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  listContainer: {
    padding: 16,
    paddingBottom: 24,
  },
  contactCard: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 10,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e0e0ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6200ee',
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 4,
  },
  contactNumber: {
    fontSize: 14,
    color: '#757575',
  },
});

export default ContactsScreen;
