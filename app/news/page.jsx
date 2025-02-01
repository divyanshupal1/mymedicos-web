import { NewsCard } from "./news_card";
import { InteractiveNews } from "./InteractiveNews";
import admin from "@/lib/firebase_admin";

export default async function NewsPage({ searchParams }) {
  const search = searchParams;
  const page = parseInt(search.page || "1");
  const searchQuery = search.query || "";
  const perPage = 15;

  console.log("searchQuery", searchQuery,"loading news....");

  let newsQuery = admin.firestore().collection("MedicalNews");

  if (searchQuery) {
    const normalizedQuery = searchQuery.toLowerCase();
    newsQuery = newsQuery
      .where("Title", "in", [normalizedQuery])
      .where("Title", "in", [normalizedQuery + "\uf8ff"]);    
  }    

  newsQuery = newsQuery
    .orderBy("Time", "desc")
    .limit(perPage)
    .offset((page - 1) * perPage);

  const newsDocs = await newsQuery.get();

  const news = newsDocs.docs.map((doc) => {
    const data = doc.data();
    return {
      ...data,
      id: doc.id,
      Time: data.Time.toMillis(),
    };
  });

  const totalDocsQuery = admin.firestore().collection("MedicalNews");
  let totalCountQuery = totalDocsQuery;

  if (searchQuery) {
    const normalizedQuery = searchQuery.toLowerCase();
    totalCountQuery = totalCountQuery
      .where("Title_lower", ">=", normalizedQuery)
      .where("Title_lower", "<=", normalizedQuery + "\uf8ff");
  }

  const totalDocs = await totalCountQuery.get();
  const totalPages = Math.ceil(totalDocs.size / perPage);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <InteractiveNews
        news={news}
        totalPages={totalPages}
        currentPage={page}
      />
    </div>
  );
}
