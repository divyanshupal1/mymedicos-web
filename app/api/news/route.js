import admin from "@/lib/firebase_admin";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page")) || 1;
  const query = searchParams.get("query") || "";
  const tab = searchParams.get("tab") || "latest";
  const category = searchParams.get("category") || "";

  try {
    const newsDocs = await newsQuery.get();
    const news = newsDocs.docs.map((doc) => {
      const data = doc.data();
      return {
        ...data,
        id: doc.id,
        Time: data.Time.toMillis(),
      };
    });
  
    const totalNews = await admin
      .firestore()
      .collection("MedicalNews")
      .count()
      .get();
  
    const totalPages = Math.ceil(totalNews.data().count / 15);
  
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <InteractiveNews
          news={news}
          totalPages={totalPages}
          currentPage={page}
        />
      </div>
    );
  } catch (error) {
    console.error("Error fetching news:", error);
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <p>Error loading news. Please try again later.</p>
      </div>
    );
  }  
}
