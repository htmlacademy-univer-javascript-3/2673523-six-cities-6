import MainPageScreen from '../../pages/main-page-screen/main-page-screen';

const Setting = {
  OffersCount: 10,
} as const;

function App(): JSX.Element {
  return (
    <MainPageScreen offersCount={Setting.OffersCount} />
  );
}

export default App;
