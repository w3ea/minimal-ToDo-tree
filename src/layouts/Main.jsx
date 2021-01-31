const Main = ({children}) => {
    return (
        <section className='flex flex-col h-screen'>
            <header className='border-b'>
                <div className='container py-5'>
                    Header
                </div>
            </header>
            
            <main className='mt-8 container flex-1'>
                {children}
            </main>
            
            <footer className='bg-gray-300'>
                <div className='container py-3'>
                    Footer
                </div>
            </footer>
        </section>
    );
};

export default Main;