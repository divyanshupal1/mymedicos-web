"use client"

import React, { useCallback, useEffect, useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import InterestSelector from './InterestSelector'
import { Button } from '@/components/ui/button'
import ImageSelect from './ImageSelector'
import {updateProfile } from "firebase/auth";
import { auth } from '@/lib/firebase'
import { collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore'
import { useToast } from '@/components/ui/use-toast'
import { db } from '@/lib/firebase'
import { useUserStore } from '@/store/userStore'
import { useRouter } from 'next/navigation'



const SignupForm = () => {

  const router = useRouter()
  const [pincode,setPincode] = useState("")
  const [address,setAddress] = useState(null)
  const {toast} = useToast()
  const user = useUserStore(state=>state.user)
  const [loading,setLoading] = useState(false)

  const fetchAddress = useCallback( async () =>{
      try{
        const res = await axios.get('/api/utility/pincode/'+pincode)
        if(res.data.success){
          setAddress(res.data.data)
          setData({...data,address:res.data.data})
        }
        else{
          setAddress(1)
        }
      }catch(e){
        //console.log(e)
      }
    }
  ,[pincode])

  useEffect(()=>{
    if(pincode.length<6) return;
    fetchAddress();
  },[pincode,fetchAddress])


  const [data,setData] = useState({
    prefix:"Dr.",
    imageUrl:"",
    interests:[],
    name:"",
    address:{},
    email:"",
  })

  const handleFormSubmit = async (e) => {
      e.preventDefault();
      if(data.name.length<3 || data.email.length<5){
        toast({
          title:"Complete required fields",
          variant:"destructive"
        })
      }
      try{
        setLoading(true)
        updateProfile(auth.currentUser,{
          displayName:data.name,
          photoURL:data.imageUrl,
        })
        const q = query(collection(db,"users"),where("Phone Number","==",user.phoneNumber))
        let userDoc = await getDocs(q)
        if(userDoc.empty){
          setDoc(doc(db,"users",user.phoneNumber),{
            ["Phone Number"]:user.phoneNumber,
            ["Email ID"]:data.email,
            ["Name"]:data.name,
            ["Prefix"]:data.prefix,
            ["Address"]:data.address,
            ["Profile"]:data.imageUrl,
            ["Interests"]:data.interests,
            DocID:user.phoneNumber
          })
          setLoading(false)
        }else{
          updateDoc(doc(db,"users",userDoc.docs[0].id),{
            ["Phone Number"]:user.phoneNumber,
            ["Email ID"]:data.email,
            ["Name"]:data.name,
            ["Prefix"]:data.prefix,
            ["Address"]:data.address,
            ["Profile"]:data.imageUrl,
            ["Interests"]:data.interests,
            DocID:userDoc.docs[0].id
          })
          setLoading(false)
        }
        router.push('/home')
        toast({
          title:"Signup Success",
        })
      }catch(e){
        //console.log(e)
        setLoading(false)
        toast({
          title:"Something went wrong",
          variant:"destructive"
        })
      }

  }

  return (
    <div className='w-full max-w-xl border shadow-lg border-neutral-200 rounded-xl p-8 backdrop-blur-lg bg-neutral-50/45'>
        <form onSubmit={handleFormSubmit}>
            <div>
              <h6 className='text-xs font-medium text-neutral-400 mb-2 pb-1 '>Personal Details</h6>
              <div className='flex gap-x-3'>
                <div className='space-y-1.5 w-20'>
                  <Label htmlfor="username">Designation</Label>
                  <PrefixSelector value={data.prefix} setValue={(val)=>setData({...data,prefx:val})}/>
                </div>
                <div className='space-y-1.5 w-full'>
                  <Label htmlfor="username">Name *</Label>
                  <Input name="username" placeholder="Your Name" type="text" required value={data.name} onChange={(e)=>setData({...data,name:e.target.value})}/>
                </div>
              </div>
              <div className='space-y-1.5 mt-2'>
                <Label htmlfor="phone">Email *</Label>
                <Input name="email" placeholder="Email" required type="email" value={data.email} onChange={(e)=>setData({...data,email:e.target.value})}/>
              </div>
            </div>

            <div className='mt-6'>
              <h6 className='text-xs font-medium text-neutral-400  mb-2 pb-1 '>Address Details</h6>
              <div className='space-y-1.5'>
                <Label htmlfor="username">Address Line</Label>
                <Input name="address" placeholder="Address" type="text"/>
              </div>
              <div className='space-y-1.5 mt-2'>
                <Label htmlfor="phone">Pincode *</Label>
                <Input name="stae" placeholder="Ex. 208016" type="text" required value={pincode} onChange={(e)=>setPincode(e.target.value)}/>
                {address==1 && <p className='text-xs text-red-500'>Invalid Pincode</p>}
              </div>
              {address !=1 && address!=null && 
              <div className='w-full md:flex gap-x-3'>
                <div className='space-y-1.5 mt-2 md:w-1/2'>
                  <Label htmlfor="phone">City</Label>
                  <Input name="stae" placeholder="Ex. 208016" type="text" value={address?.districtname} disabled/>                  
                </div>
                <div className='space-y-1.5 mt-2 md:w-1/2'>
                  <Label htmlfor="phone">State</Label>
                  <Input name="stae" placeholder="Ex. 208016" type="text" value={address?.statename} disabled/>                  
                </div>
              </div>}
            </div>

            <div className='mt-6'>
              <h6 className='text-xs font-medium text-neutral-400 mb-2 pb-1 '>Interests</h6>
              <div className='space-y-1.5'>
                  <Label htmlfor="username">Select Your Interests</Label>
                  <InterestSelector value={data.interests} setValue={(val)=>setData({...data,interests:val})}/>
              </div>
            </div>

            <div className='mt-6'>
            <div className='space-y-1.5'>
                  <Label htmlfor="username">Select Profile Picture</Label>
                  <ImageSelect setUrl={(value)=>setData({...data,imageUrl:value})}/>
              </div>
              
            </div>

            <div className='w-full mt-10 flex justify-center'>
              <Button className="w-full rounded-full max-w-md mx-auto" loading={loading}>Continue</Button>
            </div>
            </form>
    </div>
  )
}

export default SignupForm



const PrefixSelector = ({value,setValue}) =>{
    return <>      
      <Select classNamew="w-32" defaultValue={value} onValueChange={(val)=>setValue(val)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Prefix" />
        </SelectTrigger>
        <SelectContent >
          <SelectItem value="Dr.">Dr.</SelectItem>
          <SelectItem value="Hr.">Hr.</SelectItem>
          <SelectItem value="Nr.">Nr.</SelectItem>
        </SelectContent>
      </Select>
    </>
}