import '../assets/styles/main.scss';
import Main from '../layouts/Main';

const MyApp = ({ Component, pageProps }) => (
    <Main>
        <Component {...pageProps} />
    </Main>
);

export default MyApp;
