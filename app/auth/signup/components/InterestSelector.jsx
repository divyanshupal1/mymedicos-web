// src/app/page.tsx

"use client";

import React, { useEffect, useState } from "react";
import { MultiSelect } from "@/components/ui/multi-select";
import { Cat, Dog, Fish, Rabbit, Turtle } from "lucide-react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const frameworksList = [
    { value: "react", label: "React", icon: Turtle },
    { value: "angular", label: "Angular", icon: Cat },
    { value: "vue", label: "Vue", icon: Dog },
    { value: "svelte", label: "Svelte", icon: Rabbit },
    { value: "ember", label: "Ember", icon: Fish },
];

function InterestSelector({value,setValue}) {
    const [categories, setCategories] = useState([])

    const fetchCategories = async () => {
        const categoriesDoc = await getDoc(doc(db, "Categories", "39liVyLEjII6dtzolxSZ"))
        const categories = categoriesDoc.data().All
        const temp = []
        categories.forEach(category => {
            temp.push({ value: category, label: category.charAt(0).toUpperCase() + category.slice(1) })
        });
        setCategories(temp)

    }
    useEffect(() => {
        fetchCategories();
    }, [])

    return (
        <MultiSelect
            options={categories}
            onValueChange={setValue}
            defaultValue={value}
            placeholder="Select Interests"
            variant="inverted"
            animation={0}
            maxCount={3}
        />
    );
}

export default InterestSelector;