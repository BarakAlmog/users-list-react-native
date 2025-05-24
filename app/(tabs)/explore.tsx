import { Image } from 'expo-image'
import { Platform, StyleSheet } from 'react-native'

import { Collapsible } from '@/components/Collapsible'
import { ExternalLink } from '@/components/ExternalLink'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { IconSymbol } from '@/components/ui/IconSymbol'
import { useColorScheme } from '@/hooks/useColorScheme'

export default function TabTwoScreen() {
  const colorScheme = useColorScheme()

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A5D6A7', dark: '#2E7D32' }}
      headerImage={
        <IconSymbol
          size={310}
          color={colorScheme === 'dark' ? '#81C784' : '#388E3C'}
          name='chevron.left.forwardslash.chevron.right'
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type='title'>✨ Explore ✨</ThemedText>
      </ThemedView>
      <ThemedText style={styles.introText}>
        🚀 This app is here to help me teach Jeab how to work with React Native.
      </ThemedText>
      <Collapsible title='📁 File-based routing'>
        <ThemedView style={styles.collapsibleContent}>
          <ThemedText>
            📱 This app has two screens:{' '}
            <ThemedText type='defaultSemiBold'>app/(tabs)/index.tsx</ThemedText> and{' '}
            <ThemedText type='defaultSemiBold'>app/(tabs)/explore.tsx</ThemedText>
          </ThemedText>
          <ThemedText>
            🔄 The layout file in{' '}
            <ThemedText type='defaultSemiBold'>app/(tabs)/_layout.tsx</ThemedText> sets up
            the tab navigator.
          </ThemedText>
          <ExternalLink href='https://docs.expo.dev/router/introduction'>
            <ThemedText type='link' style={styles.linkText}>
              🔗 Learn more
            </ThemedText>
          </ExternalLink>
        </ThemedView>
      </Collapsible>
      <Collapsible title='📱 Android, iOS, and web support'>
        <ThemedView style={styles.collapsibleContent}>
          <ThemedText>
            🌐 You can open this project on Android, iOS, and the web. To open the web
            version, press <ThemedText type='defaultSemiBold'>w</ThemedText> in the
            terminal running this project.
          </ThemedText>
        </ThemedView>
      </Collapsible>
      <Collapsible title='🖼️ Images'>
        <ThemedView style={styles.collapsibleContent}>
          <ThemedText>
            🔍 For static images, you can use the{' '}
            <ThemedText type='defaultSemiBold'>@2x</ThemedText> and{' '}
            <ThemedText type='defaultSemiBold'>@3x</ThemedText> suffixes to provide files
            for different screen densities
          </ThemedText>
          <Image
            source={require('@/assets/images/react-logo.png')}
            style={styles.reactLogo}
          />
          <ExternalLink href='https://reactnative.dev/docs/images'>
            <ThemedText type='link' style={styles.linkText}>
              🔗 Learn more
            </ThemedText>
          </ExternalLink>
        </ThemedView>
      </Collapsible>
      <Collapsible title='🔤 Custom fonts'>
        <ThemedView style={styles.collapsibleContent}>
          <ThemedText>
            📝 Open <ThemedText type='defaultSemiBold'>app/_layout.tsx</ThemedText> to see
            how to load{' '}
            <ThemedText style={{ fontFamily: 'SpaceMono', color: '#FF6B6B' }}>
              custom fonts such as this one.
            </ThemedText>
          </ThemedText>
          <ExternalLink href='https://docs.expo.dev/versions/latest/sdk/font'>
            <ThemedText type='link' style={styles.linkText}>
              🔗 Learn more
            </ThemedText>
          </ExternalLink>
        </ThemedView>
      </Collapsible>
      <Collapsible title='🌓 Light and dark mode components'>
        <ThemedView style={styles.collapsibleContent}>
          <ThemedText>
            💡 This template has light and dark mode support. The{' '}
            <ThemedText type='defaultSemiBold'>useColorScheme()</ThemedText> hook lets you
            inspect what the user&apos;s current color scheme is, and so you can adjust UI
            colors accordingly.
          </ThemedText>
          <ExternalLink href='https://docs.expo.dev/develop/user-interface/color-themes/'>
            <ThemedText type='link' style={styles.linkText}>
              🔗 Learn more
            </ThemedText>
          </ExternalLink>
        </ThemedView>
      </Collapsible>
      <Collapsible title='✨ Animations'>
        <ThemedView style={styles.collapsibleContent}>
          <ThemedText>
            🎬 This template includes an example of an animated component. The{' '}
            <ThemedText type='defaultSemiBold'>components/HelloWave.tsx</ThemedText>{' '}
            component uses the powerful{' '}
            <ThemedText type='defaultSemiBold'>react-native-reanimated</ThemedText>{' '}
            library to create a waving hand animation.
          </ThemedText>
          {Platform.select({
            ios: (
              <ThemedText>
                🔄 The{' '}
                <ThemedText type='defaultSemiBold'>
                  components/ParallaxScrollView.tsx
                </ThemedText>{' '}
                component provides a parallax effect for the header image.
              </ThemedText>
            ),
          })}
        </ThemedView>
      </Collapsible>
    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  introText: {
    fontSize: 16,
    marginBottom: 20,
    paddingHorizontal: 10,
    textAlign: 'center',
    color: '#4CAF50',
  },
  collapsibleContent: {
    paddingVertical: 8,
    paddingHorizontal: 5,
    borderLeftWidth: 2,
    borderLeftColor: '#64B5F6',
    marginLeft: 5,
  },
  reactLogo: {
    alignSelf: 'center',
    marginVertical: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#64B5F6',
    padding: 5,
  },
  linkText: {
    color: '#FF9800',
    fontWeight: '600',
    marginTop: 8,
  },
})
