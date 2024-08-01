import { useRouter } from "next/router";

/**
 * aula 462: extracting dynamic param
 *  to extract dynamic url param use useRouter from next/router
 *  to access the arameter do router.query.[paramKey]
 */

function DetailsPage() {
  const router = useRouter();

  const newsId = router.query.newsId;
  //send request to backend

  return <h1>DetailsPage Page</h1>;
}

export default DetailsPage;
