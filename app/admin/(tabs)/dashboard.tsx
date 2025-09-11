import { useAdminRedirect } from '@/hooks/useAdminRedirect';
import { ScrollView, Text } from 'react-native';

export default function DashboardScreen() {
    useAdminRedirect();
    
    return (
        <ScrollView>
            <Text >Dashboard</Text>
        </ScrollView>
    );
}
