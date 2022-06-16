import {useNavigation} from '@react-navigation/native';
import {supabase} from 'api/client';
import {TrapNavigationProp} from 'navigation/trap-navigator';
import {useMutation, useQueryClient} from 'react-query';

type DeleteTrapProps = {
  id: number;
};

const createTrap = async ({id}: DeleteTrapProps) => {
  console.log(id);

  const {body, error} = await supabase.from('traps').delete().eq('id', id);

  if (error) {
    console.log('error', error);
    throw error;
  }

  console.log(body);
  return body;
};

export const useDeleteTrap = (props: DeleteTrapProps) => {
  const queryClient = useQueryClient();
  const navigation = useNavigation<TrapNavigationProp<'create'>>();
  return useMutation('delete-trap', () => createTrap(props), {
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: 'traps'});
      queryClient.refetchQueries({queryKey: 'traps'});
      navigation.navigate('overview');
    },
  });
};
