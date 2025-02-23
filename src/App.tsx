import React, { useState, useEffect } from 'react';
import { TimeCapsule, CapsuleFormData, CapsuleAction, Toast } from './types';
import { CapsuleForm } from './components/CapsuleForm';
import { CapsuleList } from './components/CapsuleList';
import { ToastContainer } from './components/ToastContainer';
import { Timer, LogOut } from 'lucide-react';
import { loadCapsules, saveCapsules } from './utils/storage';
import { createToast } from './utils/toast';
import { Auth } from './components/Auth';
import { supabase } from './lib/supabase';

function App() {
  const [capsules, setCapsules] = useState<TimeCapsule[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) {
      try {
        setCapsules(loadCapsules());
      } catch (error) {
        setToasts(prev => [...prev, createToast('Failed to load capsules', 'error')]);
      }
    }
  }, [session]);

  useEffect(() => {
    if (session) {
      try {
        saveCapsules(capsules);
      } catch (error) {
        setToasts(prev => [...prev, createToast('Failed to save capsules', 'error')]);
      }
    }
  }, [capsules, session]);

  const handleCreateCapsule = (data: CapsuleFormData) => {
    try {
      const newCapsule: TimeCapsule = {
        id: crypto.randomUUID(),
        title: data.title,
        message: data.message,
        fileUrl: data.file ? URL.createObjectURL(data.file) : undefined,
        unlockDate: data.unlockDate,
        isLocked: true,
        password: data.password,
        attempts: 0,
      };
      
      setCapsules(prev => [...prev, newCapsule]);
      setToasts(prev => [...prev, createToast('Time capsule created successfully')]);
    } catch (error) {
      setToasts(prev => [...prev, createToast('Failed to create time capsule', 'error')]);
    }
  };

  const handleCapsuleAction = (id: string, action: CapsuleAction, password?: string) => {
    try {
      if (action === 'delete') {
        const capsule = capsules.find(c => c.id === id);
        if (!capsule) return;
        
        if (password === capsule.password) {
          setCapsules(prev => prev.filter(capsule => capsule.id !== id));
          setToasts(prev => [...prev, createToast('Time capsule deleted successfully')]);
        } else {
          setToasts(prev => [...prev, createToast('Incorrect password', 'error')]);
        }
      } else if (action === 'unlock') {
        setCapsules(prev => prev.map(capsule => 
          capsule.id === id ? { ...capsule, isLocked: false } : capsule
        ));
        setToasts(prev => [...prev, createToast('Time capsule unlocked successfully')]);
      }
    } catch (error) {
      setToasts(prev => [...prev, createToast(`Failed to ${action} time capsule`, 'error')]);
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      setToasts(prev => [...prev, createToast('Signed out successfully')]);
    } catch (error) {
      setToasts(prev => [...prev, createToast('Failed to sign out', 'error')]);
    }
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!session) {
    return <Auth onSuccess={() => setToasts(prev => [...prev, createToast('Welcome to Time Capsule!')]) } />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
          <img src="https://cdn.discordapp.com/attachments/1284481603212410902/1343228585380548660/20250223_200021.png?ex=67bc829a&is=67bb311a&hm=302ef9ff74a3ddd2686ea452a23a03421f09c197e11e428821d3b5c42cc740c2&" alt="Logo" className="h-12 w-auto shadow-md rounded-s" />
            <h1 className="text-3xl font-bold text-gray-900">SamayCapsule</h1>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>

        <div className="grid md:grid-cols-[400px,1fr] gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Create New Capsule</h2>
            <CapsuleForm onSubmit={handleCreateCapsule} />
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Your SamayCapsules</h2>
            <CapsuleList 
              capsules={capsules} 
              onAction={handleCapsuleAction}
            />
          </div>
        </div>
      </div>
      
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}

export default App;