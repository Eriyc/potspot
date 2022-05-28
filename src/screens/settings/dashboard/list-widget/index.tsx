import {useNavigation} from '@react-navigation/native';
import {
  SettingsNavigationProp,
  SettingsStackParamsList,
} from 'navigation/settings-navigator';
import React, {memo, useCallback, useMemo} from 'react';
import {
  Linking,
  SectionList,
  SectionListData,
  SectionListRenderItemInfo,
  StyleSheet,
} from 'react-native';
import {ChevronRight, ExternalLink} from 'react-native-feather';

import {Pressable, Text, useTheme, View} from 'ui';
import {SectionData, SectionType} from '../types';
import {AccountWidget} from './account-widget';
import {InformationWidget} from './other-widget';
import {TrapWidget} from './trap-widget';

const widgets = [TrapWidget, AccountWidget, InformationWidget];

const renderSectionHeader = ({
  section,
}: {
  section: SectionListData<SectionType, SectionData>;
}) => {
  return (
    <View flexDirection="row" marginVertical="m" alignItems="center">
      <View mr="m">{section.icon}</View>
      <Text>{section.title}</Text>
    </View>
  );
};
const renderSection = (
  props: SectionListRenderItemInfo<SectionType, SectionData>,
) => {
  const navigation = useNavigation<SettingsNavigationProp<'dashboard'>>();

  const isLast = props.index === props.section.data.length - 1;
  const isFirst = props.index === 0;

  const {external, label, navigateTo} = props.item;

  const onPress = useCallback(() => {
    if (external) {
      Linking.openURL(navigateTo);
    } else {
      navigation.navigate(navigateTo as keyof SettingsStackParamsList);
    }
  }, [external, navigateTo, navigation]);

  return (
    <View
      bg="background"
      borderColor="grey3"
      overflow="hidden"
      style={[
        isFirst && styles.first,
        isLast && styles.last,
        isFirst && isLast && styles.only,
      ]}>
      <Pressable
        p="m"
        flexDirection="row"
        android_ripple={{borderless: true}}
        onPress={onPress}>
        <View flex={1}>
          <Text>{label}</Text>
        </View>
        {external ? (
          <ExternalLink height={24} width={24} color="black" />
        ) : (
          <ChevronRight height={24} width={24} color="black" />
        )}
      </Pressable>
    </View>
  );
};

export const ListWidget = () => {
  return (
    <View p="l">
      <SectionList
        sections={widgets}
        renderItem={renderSection}
        renderSectionHeader={renderSectionHeader}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  first: {
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
    borderBottomWidth: 1,
  },
  last: {
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 4,
    borderBottomWidth: 0,
  },
  only: {
    borderBottomWidth: 0,
    borderTopWidth: 0,
  },
});
