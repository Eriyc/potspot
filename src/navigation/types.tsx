import type {AuthStackParamList} from './auth-navigator';

export type RootStackParamList = AuthStackParamList;

// export type RootStackParamList = AuthStackParamList & XXXStackParamList  &  YYYStackParamList  ;

// very important to type check useNavigation hook
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
