import { Session } from '@supabase/supabase-js';
import { create } from 'zustand';

interface IUseUserStore {
  user: IUser | null;
  session: Session | null;
  setSession: (session: Session) => void;
  setUser: (user: IUser) => void;
  clearUser: () => void;
}

const useUserStore = create<IUseUserStore>()((set) => ({
  user: null,
  session: null,
  setSession: (session) => set(() => ({ session })),
  setUser: (user) => set(() => ({ user })),
  clearUser: () => set(() => ({ user: null, session: null })),
}));

export default useUserStore;
