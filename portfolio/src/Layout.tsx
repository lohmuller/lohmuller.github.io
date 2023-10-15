import { NavLink, Outlet } from "react-router-dom";
export default function Layout() {
    const testMenuItems = [
        {
            href: '/',
            title: 'Home',
        },
        {
            href: 'about',
            title: 'About',
        },
        {
            href: 'xablonico',
            title: 'Contact',
        },
        {
            href: 'https://github.com/lohmuller',
            title: 'GitHub',
            target: "_blank"
        }
    ];
    return (<Outlet />);

    <li><NavLink to="/">Home</NavLink></li>
    return (
        <div className='min-h-screen flex flex-col'>
            <div className='flex flex-col md:flex-row flex-1'>
                <aside className='bg-gray-100 w-full md:w-60'>
                    <nav>
                        <ul>
                            {testMenuItems.map(({ href, title, target }) => (
                                <li className='m-2' key={title}>
                                    <NavLink to={href} target={!target ? "_self" : target}>
                                        <p className={'text-black'}>{title}</p>
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </aside>
                <main className={'flex-1'}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}