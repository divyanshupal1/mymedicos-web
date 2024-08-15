/* eslint-disable @next/next/no-img-element */
import { HiMiniSparkles } from "react-icons/hi2";
import { TbMoodConfuzed } from "react-icons/tb";
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const options = ['A','B','C','D']
const dummyImage =["noimage","https://firebasestorage.googleapis.com/v0/b/mymedicosupdated.appspot.com/o/Quiz%2Fthumbnails%2F6b7d1ffd-7637-4633-9fc8-004702f7ada4No.png?alt=media&token=5e162813-a98b-449c-a07d-e34c5faa1bde"];

const optionVariants = cva(
    "cursor-pointer rounded-lg border-2 p-4",{
    variants:{
        variant:{
        correct: 'bg-green-200 border-green-300',
        incorrect: 'bg-red-200 border-red-300',
        default: 'border-neutral-200'
        }
    },
    defaultVariants: 'default'
})

const ResultPage = ({quiz,answers,score}) => {

    return (
        <div className='w-full h-auto flex flex-col gap-x-2'>
            <div className='font-bold text-lg p-4 bg-slate-200 bg-opacity-80 backdrop-blur-md sticky top-0 w-full flex justify-between items-center'>
                {quiz.title}
            </div>
            <div className='p-4 max-md:p-0'>
                <div className='font-bold text-lg'>Your Score: {score}</div>
                <div className='mt-4'>
                    {
                        quiz.Data.map((q,index)=> {                            
                            return (
                                <div key={index} className='p-4 rounded-lg mt-2'>
                                    <div className='font-semibold text-lg'>Q{q.number+1} ).  {q.Question}</div>
                                    <div>
                                        {q.Image !==undefined && dummyImage.includes(q.Image)==-1 && <img src={q.Image} className='w-auto h-[400px] mt-4 mx-auto rounded-lg object-contain' alt="Question Image"/>}
                                    </div>
                                    <div className='grid grid-cols-2 max-md:grid-cols-1 mt-4 gap-x-3 gap-y-4 '>
                                        <ResultOptionGroup index={index} question={q} answer={answers[q.number]}/>
                                    </div>
                                    <div className={`text-lg font-medium mt-4 ml-4 flex items-center gap-x-3 ${answers[q.number]==q.Correct?" text-green-600":"text-red-500"}`}>{answers[q.number]!=undefined?(answers[index]==q.Correct?<><HiMiniSparkles/> Correct Answer</>:<><span className='scale-125 -z-10'><TbMoodConfuzed/></span> Wrong Answer</>):<>Not attempted</>}</div>
                                    <div className='text-lg font-semibold mt-4'>Explanation</div>
                                    <div className='p-3 mt-2 bg-neutral-50 rounded-lg' dangerouslySetInnerHTML={{__html:quiz.Data[index].Description}}></div>
                                </div>
                            )
                            }
                        )
                    }
                </div>
            </div>
        </div>
    )

}
const ResultOptionGroup = ({index,question,answer}) => {
    return (
        <>
        {
            options.map((option,idx)=>{
                let thisIsCorrect = option == question.Correct
                let thisIsChosen = answer==option
                return (
                    <div 
                        key={index} 
                        className={cn(optionVariants({variant: thisIsCorrect?"correct":(thisIsChosen?"incorrect":"default")}),"cursor-default")}
                    >
                        {option}. {question[option]}
                    </div>
                )
            })
        }
        </>
    )
}

export default ResultPage;