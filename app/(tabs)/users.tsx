import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { IconSymbol } from '@/components/ui/IconSymbol'
import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Linking,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native'

interface User {
  id: number
  name: string
  username: string
  email: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}

export default function UsersScreen() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users')
      const data = await response.json()
      setUsers(data)
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch users. Please try again.')
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const onRefresh = () => {
    setRefreshing(true)
    fetchUsers()
  }

  const handleContactPress = (type: 'email' | 'website', value: string) => {
    if (type === 'email') {
      Linking.openURL(`mailto:${value}`)
    } else {
      const url = value.startsWith('http') ? value : `https://${value}`
      Linking.openURL(url)
    }
  }

  const getCardColor = (index: number) => {
    const colors = [
      { bg: '#F3F4F6', accent: '#3B82F6' }, // Blue
      { bg: '#FEF2F2', accent: '#EF4444' }, // Red
      { bg: '#F5F3FF', accent: '#8B5CF6' }, // Purple
      { bg: '#F0FDF4', accent: '#10B981' }, // Green
      { bg: '#FFF7ED', accent: '#F59E0B' }, // Orange
    ]
    return colors[index % colors.length]
  }

  const getLocationString = (address: User['address']) => {
    return `${address.city}, ${address.zipcode}`
  }

  const renderUserCard = ({ item, index }: { item: User; index: number }) => {
    const cardColor = getCardColor(index)

    return (
      <ThemedView style={[styles.userCard, { backgroundColor: cardColor.bg }]}>
        <View style={styles.cardHeader}>
          <View style={styles.leftSection}>
            <View style={[styles.avatarCircle, { backgroundColor: cardColor.accent }]}>
              <ThemedText style={styles.avatarText}>
                {item.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </ThemedText>
            </View>
            <View style={styles.headerInfo}>
              <ThemedText style={styles.userName}>{item.name}</ThemedText>
              <ThemedText style={styles.userRole}>{item.company.name}</ThemedText>
            </View>
          </View>
          <View style={styles.rightSection}>
            <View style={[styles.idBadge, { backgroundColor: cardColor.accent }]}>
              <ThemedText style={styles.idText}>#{item.id}</ThemedText>
            </View>
          </View>
        </View>

        <View style={styles.locationSection}>
          <IconSymbol name='location.fill' size={14} color={cardColor.accent} />
          <ThemedText style={styles.locationText}>
            {getLocationString(item.address)}
          </ThemedText>
        </View>

        <View style={styles.contactRow}>
          <ThemedText
            style={[
              styles.contactButton,
              { borderColor: cardColor.accent, color: cardColor.accent },
            ]}
            onPress={() => handleContactPress('email', item.email)}
          >
            Email
          </ThemedText>
          <ThemedText
            style={[
              styles.contactButton,
              { borderColor: cardColor.accent, color: cardColor.accent },
            ]}
            onPress={() => handleContactPress('website', item.website)}
          >
            Website
          </ThemedText>
        </View>

        <View style={styles.companySection}>
          <ThemedText style={styles.catchPhrase}>
            &quot;{item.company.catchPhrase}&quot;
          </ThemedText>
        </View>
      </ThemedView>
    )
  }

  if (loading) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='#3B82F6' />
        <ThemedText style={styles.loadingText}>Loading users...</ThemedText>
      </ThemedView>
    )
  }

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>Mental Health</ThemedText>
        <ThemedText style={styles.subtitle}>Team Members Directory</ThemedText>
      </View>

      <FlatList
        data={users}
        renderItem={renderUserCard}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={styles.listContainer}
      />
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#6B7280',
  },
  listContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  userCard: {
    marginBottom: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  avatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  headerInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  userRole: {
    fontSize: 14,
    color: '#6B7280',
  },
  idBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  idText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  locationSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  locationText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#6B7280',
  },
  contactRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  contactButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 20,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    overflow: 'hidden',
  },
  companySection: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  catchPhrase: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#6B7280',
    lineHeight: 20,
  },
})
