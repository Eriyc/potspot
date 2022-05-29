import {useNavigation} from '@react-navigation/native';
import {supabase} from 'api/client';
import {useAuth} from 'core';
import {TrapNavigationProp} from 'navigation/trap-navigator';
import {useMutation, useQueryClient} from 'react-query';
import {GetAvalibleCatchesIds} from 'screens/trap/get/get-trap-state';
import {Trap} from './use-all-traps';
import {useSingleTrap} from './use-single-trap';

type UseVittjaTrapData = {
  data: Record<
    string,
    {data: any[]; type: GetAvalibleCatchesIds; amount: number}
  >;
};
const vittjaTrap = async (
  {data}: UseVittjaTrapData,
  uid: string,
  pos: [number, number],
  trapId: number,
  baitId: number,
) => {
  Object.entries(data).forEach(([id, val]) => {
    const amount = val.amount;
    console.log(`${amount}x ${val.type}`);
    val.data.forEach(lobster => {
      if (lobster.hasData) {
        console.log('-', lobster.gender, lobster.carapax);
      }
    });
  });

  const {body, error} = await supabase.from('catch').insert({
    created_by: uid,
    trap_id: trapId,
    position: `POINT(${pos[0]} ${pos[1]})`,
    data,
    bait_id: baitId,
  });

  const {error: error2} = await supabase
    .from('traps')
    .update({in_use: false})
    .eq('id', trapId);

  if (error) {
    throw error;
  }
  if (error2) {
    throw error2;
  }
};

export const useVittjaTrap = (trapId: number) => {
  const queryClient = useQueryClient();
  const auth = useAuth();
  const navigation = useNavigation<TrapNavigationProp<'get'>>();

  const uid = auth.uid;
  const trap = queryClient.getQueryData<Trap>(['trap', trapId])!;
  const position = trap.pos;
  const bait = trap.bait;

  return useMutation<void, Error, UseVittjaTrapData>(
    props => vittjaTrap(props, uid!, position, trapId, bait),
    {
      onSuccess: () => {
        navigation.navigate('details', {id: trapId});
      },
    },
  );
};
