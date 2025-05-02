
import { useState, useEffect } from 'react';

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Handler yang akan mengubah state ketika ukuran layar berubah
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Periksa ukuran layar saat komponen di-mount
    checkIfMobile();
    
    // Tambahkan event listener untuk resize
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup function untuk menghapus event listener
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);
  
  return isMobile;
}
