import Welcome from '../components/Welcome';
import { useSelector } from 'react-redux';
function Index() {
  const user = useSelector((state) => state.user.value);

  if (user.token) {
    window.location.href = '/Accueil'
  }
  return <Welcome />;
}

export default Index;
