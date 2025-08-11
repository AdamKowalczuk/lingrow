import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div>
      <Button>DEFAULT</Button>
      <Button variant="primary">PRIMARY</Button>
      <Button variant="primaryOutline">PRIMARY OUTLINE</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="secondaryOutline">Secondary Outline</Button>
      <Button variant="danger">DANGER</Button>
      <Button variant="dangerOutline">DANGER OUTLINE</Button>
      <Button variant="super">Super</Button>
      <Button variant="superOutline">Super OUTLINE</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="sidebar">Sidebar</Button>
      <Button variant="sidebarOutline">Sidebar OUTLINE</Button>
      
    </div>
  );
}
