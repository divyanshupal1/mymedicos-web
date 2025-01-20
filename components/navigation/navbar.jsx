"use client"
import React from 'react'
import { Input } from '@/components/ui/input'
import { Logo } from '@/lib/icons'
import { CrossIcon, Search } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useUserStore } from '@/store/userStore'
import { HiMenuAlt3 } from "react-icons/hi";
import { WiStars } from "react-icons/wi";

const links = [
    // {sub:false,name:'Home',href:"/home"},
    // {sub:false,name:'MBBS',href:"/mbbs"},
    // {sub:false,name:'PG NEET',href:"/pgneet"},
    // {sub:false,name:'FMGE',href:"/fmge"},
    {sub:false,name:'Exclusive',href:"/exclusive"},
    {sub:false,name:'News',href:"/news"},
    {sub:false,name:'Community',href:"/community"},
    // {sub:false,name:'NEET SS',href:"/neetss"},
    // {   
    //     sub:true,
    //     dropdown : [
    //         {name:'News',href:"/news"},
    //         {name:'Blog',href:"/blog"},
    //     ],
    //     name:'Explore'
    // },
]

export const Navbar = () => {

    const path = usePathname().split('/')    

    const {loggeduser} = useUserStore((state)=>({
        loggeduser:state.user,
    }))        

    if(path[1]==='auth' || path[1]=="test" || path[1]=="checkout"){
        return null
    }



    return (
        <nav className='w-full flex flex-col shadow-sm z-[1000] bg-white dark:bg-background border-b border-transparent dark:border-green-950'>
            <div className='w-full flex justify-between items-center p-3 px-5 '>
                <div className='logo h-8 w-auto grow-0'>
                    <Logo/>
                </div>
                {
                    path[1]!== '' && 
                    <div className='flex items-center justify-evenly gap-x-6 w-auto flex-grow max-w-4xl'>
                        <div className='max-w-xs max-llg:hidden max-mmd:block max-sm:hidden '>
                            {/* <SearchBar/> */}
                        </div>
                        <ul className='space-x-2 max-mmd:hidden'>
                            {
                                links.map((link,index)=>(
                                    <NavLink key={index} item={link}/>
                                ))
                            }
                            
                        </ul>
                    </div>
                }
                {   
                    path[1]!== '' && 
                    <div className='grow-0 flex items-center gap-x-6'>
                        {/* <Link href={"/ppt"}>
                        <div className=' p-2 rounded-full px-4 shadow-md bg-violet-500 text-white cursor-pointer relative'>
                            <span>AI PPT Generator</span>
                            <div className='absolute top-0 right-0'>
                                <div className='w-full h-full relative animate-pulse'>
                                    <span className='absolute top-0 right-0 scale-[3] text-[#FFD700]'><WiStars/></span>
                                    <span className='absolute top-0 right-0 scale-[3] text-[#FFD700] blur-[2px]'><WiStars/></span>
                                </div>
                            </div> 
                        </div>
                        </Link> */}
                        <ProfileButton/>
                        <div className='hidden max-mmd:block'><SideBar/></div>
                    </div>
                }
                {
                    path[1]== ''  && 
                    <div className='flex items-center gap-x-2'>
                        <Link href='/auth/login'><button className='rounded-full bg-[#00BFA6] text-white p-2 px-4'>Login</button></Link>
                        {/* <Link href='/auth/signup'><button className='rounded-full bg-[#00BFA6] text-white p-2 px-4'>Signup</button></Link> */}
                    </div>
                }
            </div>
            {/* { path[1]!== '' && path.length<=2 && <div className={`h-16 hidden max-llg:flex max-mmd:hidden max-sm:flex justify-center p-2 ${path.length>2 ? "hidden":""}`}>
                <SearchBar className={"max-w-[800px]"}/>
            </div> }            */}
        </nav>
        
    )
}


const NavLink = ({item}) => {
    const path = usePathname().split('/')[1]
    const active = '/'+path === item.href
    return (
        <>
            {
                item.sub?
                <>
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                            <NavigationMenuTrigger className="rounded-full inline-flex">{item.name}</NavigationMenuTrigger>
                            <NavigationMenuContent className="rounded-lg border-transparent outline-none">
                                <div className='flex flex-col p-2 min-w-[150px]'>
                                {
                                    item.dropdown.map((link,index)=>(
                                        <Link href={link.href} key={index} className='cursor-pointer  hover:bg-secondary rounded-lg p-2 px-4' >{link.name}</Link>
                                    ))
                                }
                                </div>
                            </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </>
                :
                <Link href={item.href}><li className={`inline-block rounded-full p-2 px-4 text-base font-medium tracking-wide max-mmd:w-full  ${active?"bg-[#00BFA6] text-white":"hover:bg-[#00BFA6] hover:text-white"} `}>{item.name}</li></Link>
            }
        </>
    )
}


import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from '../ui/use-toast'
import { signOut } from 'firebase/auth' 


const ProfileButton = () => {
    const router = useRouter()
    const {toast} = useToast()
    const {loggeduser,setUser} = useUserStore((state)=>({
        loggeduser:state.user,
        setUser:state.setUser
    }))  
    const signOutUser = () => {
        signOut(auth).then(() => {
            setUser(null)
        }).catch((error) => {
            toast({
                title: 'Error signing out',
            })
        });
    }
    const gotoProfile = () => {
        router.push('/profile')
    }
    return (
        <>
        {   
            loggeduser!=null &&
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <div className='flex items-center gap-x-2 rounded-full'>
                        <Avatar className="w-8 h-8">
                            <AvatarImage src={loggeduser.photoURL} />
                                <AvatarFallback>{loggeduser?.displayName?.substring(0,2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="text-base font-medium">
                        <DropdownMenuItem onClick={gotoProfile}>Profile</DropdownMenuItem>
                        <DropdownMenuItem onClick={signOutUser}>Logout</DropdownMenuItem>
                        {/* <DropdownMenuItem asChild><ThemeToggle/></DropdownMenuItem> */}

                    </DropdownMenuContent>
                </DropdownMenu>
        }
        </>
    )
}

const SearchBar = ({className=""}) => {
    const [search , setSearch] = React.useState('')
    return (
        <div className={'search relative rounded-full h-9 w-full '+ className}>
            <div className='text-[#03755A] h-6 w-6 scale-90 absolute left-2 top-1/2 -translate-y-1/2'><Search/></div>
            <Input placeholder='Search for anything' className=" h-full text-sm rounded-full pl-10 bg-[#DEF7F1] border-none" value={search} onChange={(e)=>setSearch(e.target.value)}/>
        </div>
    )
}



const SideBar = () => {
    const [open,setOpen] = React.useState(false)
    const {toast} = useToast()    
    const signOutUser = () => {
        signOut(auth).then(() => {
            setUser(null)
        }).catch((error) => {
            toast({
                title: 'Error signing out',
            })
        });
    }
    return (
        <>            
            <HiMenuAlt3 className='scale-[1.5]' onClick={()=>setOpen(!open)}/>
            {
                open && <div className='w-full fixed top-0 left-0 flex-grow h-full bg-black z-[1000]  bg-opacity-60' onClick={()=>setOpen(false)}></div> 
            }
            {
                <div className={`w-full fixed top-0 right-0 max-w-[500px] z-[1000] h-full bg-white p-6 flex flex-col overflow-y-scroll scroll-hide transition-all ${open?"translate-x-0":"translate-x-full"}`}>
                    <div className='w-full flex justify-end items-center'>
                        <IoClose className='scale-[2]' onClick={()=>setOpen(false)}/>
                    </div>
                    <div className='flex flex-col p-4 gap-y-5 mt-12 w-full max-w-sm'>
                        {
                            links.map((link,index)=>(
                                <NavLink key={index} item={link}/>
                            ))
                        }
                    </div>
                    <div className='mt-auto'>
                        <Button className='w-full rounded-full' variant="secondary" onClick={signOutUser}>Logout</Button>
                    </div>
                </div>
            }
        </>
    )
}
import { Button } from '@/components/ui/button'
import { IoClose } from "react-icons/io5";
import { ThemeToggle } from '../theme-toggle'
