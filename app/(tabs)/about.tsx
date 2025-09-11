import AboutAgents from '@/components/user/about/about-agents';
import AboutHeader from '@/components/user/about/about-header';
import AboutHero from '@/components/user/about/about-hero';
import AboutMission from '@/components/user/about/about-mission';
import AboutStats from '@/components/user/about/about-stats';
import { ScrollView } from 'react-native';


export default function AboutScreen() {
  return (
    <ScrollView>
      <AboutHeader />
      <AboutHero />
      <AboutMission />
      <AboutStats />
      <AboutAgents />
    </ScrollView>
  );
}
