import DashboardMain from '@/components/admin/dashboard/dashboard-main';
import { useAdminRedirect } from '@/hooks/useAdminRedirect';
import { ScrollView } from 'react-native';

export default function DashboardScreen() {
    useAdminRedirect();
    
    return (
        <ScrollView>
            <DashboardMain />
        </ScrollView>
    );
}
