import {useNavigation} from '@react-navigation/native';
import {AuthNavigationProp} from 'navigation/auth-navigator';
import React, {useCallback} from 'react';
import {Image, StyleSheet} from 'react-native';
import {Button, Screen, View} from 'ui';

export const LandingScreen = () => {
  const navigation = useNavigation<AuthNavigationProp>();

  const signIn = useCallback(() => {
    navigation.navigate('sign-in');
  }, [navigation]);
  const signUp = useCallback(() => {
    navigation.navigate('sign-up');
  }, [navigation]);

  return (
    <Screen>
      <View flex={2}>
        <View flexDirection="row">
          <Image
            resizeMode="center"
            style={styles.logo}
            source={require('../../../../assets/logo_black.png')}
          />
        </View>
      </View>
      <View flex={1}>
        <Button label="Logga in" onPress={signIn} variant="primary" />
        <Button label="Skapa konto" onPress={signUp} variant="secondary" />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  logo: {
    flex: 1,
  },
});
