import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export function ContentAccordion({title,children}) {
    return (
        <Accordion type="single" collapsible className="w-full mb-2">
            <AccordionItem value="item-1">
                <AccordionTrigger className="bg-neutral-100 rounded-md px-4">{title}</AccordionTrigger>
                <AccordionContent>
                    {children}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}
