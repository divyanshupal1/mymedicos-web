/* eslint-disable react/no-unescaped-entities */
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CheckCircle2, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";


export function InstructorCard({
    Interest,
    interest2,
    Location,
    Name,
    Prefix,
    Profile,
    DocID
}) {
    return (
        <Link href={`/exclusive/instructors/${DocID}`} className="w-full max-w-[300px] overflow-hidden transition-all hover:shadow-lg cursor-pointer">
        <Card className="w-full">
            <CardContent className="p-6">
                <div className="flex flex-col items-center gap-10">
                    <Avatar className="h-[200px] w-[200px] border-2 border-primary/10">
                        <AvatarImage src={Profile} alt={Name} />
                        <AvatarFallback>{Prefix}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-4">
                        <div className="text-center">
                            <h3 className="text-xl font-bold">
                                {Prefix} {Name}
                            </h3>
                            <div className="mt-1 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                                <MapPin className="h-4 w-4" />
                                {Location}
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2 w-full justify-center">
                            <Badge variant="secondary">{Interest}</Badge>
                            {/* <Badge variant="secondary">{interest2}</Badge> */}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
        </Link>
    );
}