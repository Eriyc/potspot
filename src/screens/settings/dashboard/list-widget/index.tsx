import {useNavigation} from '@react-navigation/native';
import {
  SettingsNavigationProp,
  SettingsStackParamsList,
} from 'navigation/settings-navigator';
import React, {useCallback} from 'react';
import {
  Linking,
  SectionList,
  SectionListData,
  SectionListRenderItemInfo,
  StyleSheet,
} from 'react-native';
import {ChevronRight, ExternalLink} from 'react-native-feather';

import {Pressable, Text, theme, View} from 'ui';
import {SectionData, SectionType} from '../types';
import {AccountWidget} from './account-widget';
import {InformationWidget} from './other-widget';
import {TrapWidget} from './trap-widget';

const widgets = [TrapWidget, AccountWidget, InformationWidget];

const RenderSectionHeader = ({
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
const RenderSection = (
  props: SectionListRenderItemInfo<SectionType, SectionData>,
) => {
  const navigation = useNavigation<SettingsNavigationProp<'dashboard'>>();

  const isLast = props.index === props.section.data.length - 1;
  const isFirst = props.index === 0;

  const onPress = useCallback(() => {
    if (props.item.custom) {
      return;
    }

    if (props.item.external) {
      Linking.openURL(props.item.navigateTo);
    } else {
      navigation.navigate(
        props.item.navigateTo as keyof SettingsStackParamsList,
      );
    }
  }, [props.item, navigation]);

  if (props.item.custom) {
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
        {props.item.component}
      </View>
    );
  }

  const {external, label} = props.item;

  return (
    <View
      bg="background"
      borderColor="grey3"
      borderBottomWidth={1.2}
      overflow="hidden"
      style={[
        isFirst && styles.first,
        isLast && styles.last,
        isFirst && isLast && styles.only,
      ]}>
      <Pressable
        p="m"
        flexDirection="row"
        android_ripple={{borderless: true, color: theme.colors.grey3}}
        alignItems="center"
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
        renderItem={RenderSection}
        renderSectionHeader={RenderSectionHeader}
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
