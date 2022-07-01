import {useNavigation} from '@react-navigation/native';
import {supabase} from 'api/client';
import {Point} from 'geojson';
import {TrapNavigationProp} from 'navigation/trap-navigator';
import {useMutation, useQueryClient} from 'react-query';
import {Trap} from './use-all-traps';

type CreateTrapProps = {
  pos: Point;
  displayname: string;
};

const createTrap = async ({pos, displayname}: CreateTrapProps) => {
  const {body, error} = await supabase
    .rpc<Trap>('v1/trap/create', {
      details: {
        displayname: displayname,
        pos: JSON.stringify(pos),
      },
    })
    .single();

  if (error) {
    throw error;
  }

  return body;
};

export const useCreateTrap = () => {
  const queryClient = useQueryClient();
  const navigation = useNavigation<TrapNavigationProp<'create'>>();
  return useMutation(
    'create-trap',
    (props: CreateTrapProps) => createTrap(props),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: 'traps'});
        navigation.navigate('overview');
      },
    },
  );
};
