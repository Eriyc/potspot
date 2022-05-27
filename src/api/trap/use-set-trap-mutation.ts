import {useMutation, useQueryClient} from 'react-query';

const setTrap = async () => {
  await new Promise(res => {
    setTimeout(res, 1000);
  });

  return;
};

export const useSetTrapMutation = () => {
  const queryClient = useQueryClient();
  return useMutation('set-trap', () => setTrap());
};
