import {useNavigation} from '@react-navigation/native';
import {supabase} from 'api/client';
import {TrapNavigationProp} from 'navigation/trap-navigator';
import {useMutation, useQueryClient} from 'react-query';

type DeleteTrapProps = {
  id: number;
};

const deleteTrap = async ({id}: DeleteTrapProps) => {
  const {body, error} = await supabase.rpc('v1_trap_delete', {id: id});

  if (error) {
    console.log('error deleting trap:', error);
    throw error;
  }

  console.log(body);
  return body;
};

export const useDeleteTrap = (props: DeleteTrapProps) => {
  const queryClient = useQueryClient();
  const navigation = useNavigation<TrapNavigationProp<'create'>>();
  return useMutation('delete-trap', () => deleteTrap(props), {
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: 'traps'});
      queryClient.refetchQueries({queryKey: 'traps'});
      navigation.navigate('overview');
    },
  });
};
