import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authApi } from '../services/authApi';
import { clearAccessToken } from '@/shared/services/api';

export function useLogin() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: authApi.login,
    onSuccess: () => {
      // Invalida todas as queries pra forçar refetch com novo token
      queryClient.invalidateQueries();
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      clearAccessToken();
      queryClient.clear(); // Limpa todo cache
      window.location.href = '/login';
    },
  });
}

export function useCurrentUser() {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: authApi.getCurrentUser,
    retry: false, // Não tenta de novo se der erro
    staleTime: Infinity, // Cache nunca expira (até invalidar manualmente)
  });
}