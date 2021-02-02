const Main = ({children}) => {
    return (
        <section className='flex flex-col h-screen'>
            <header className='border-b'>
                <div className='container py-3 md:py-4'>
                    ToDo tree list
                </div>
            </header>
            
            <main className='mt-8 container flex-1'>
                {children}
            </main>
            
            <footer className='bg-gray-600'>
                <div className='h-2.5'/>
            </footer>
        </section>
    );
};

export default Main;