import { http_get } from "@twodashes/node/cjs/requests";
// import { sort_objects_by_property } from "@twodashes/universal/umd/sort_objects";
import Head from "next/head";
import Link from "next/link";
import { MainStyled } from "src/pages_styled/dogs";
import DogsCarousel from "src/components/DogsCarousel";

export default function Home({ dogs = [] }) {
  return (
    <>
      <Head>
        <title>All the dogs</title>
      </Head>

      <MainStyled className="main">
        <header>
          <h2>All the dogs!</h2>
          <p>
            <span style={{ textShadow: "0 1px 1px rgba(0,0,0,0.5)" }}>👇</span>&thinsp; Click each breed or sub-breed to
            see more photos.{" "}
          </p>
        </header>
        <section>
          {dogs.map((dog) => {
            return (
              <article key={dog.type}>
                <h3>
                  <Link href={`/dogs/${dog.type}`}>
                    <a className="breed-title-link">
                      <span>{dog.type}s</span>
                      <span className="link-icon icon-dot-dot-dot" />
                    </a>
                  </Link>
                </h3>
                <DogsCarousel breeds={dog.breeds} />
              </article>
            );
          })}
        </section>
      </MainStyled>
    </>
  );
}

export async function getStaticProps(context) {
  let dogBlogs = [];
  let dogsData = await http_get("https://dog.ceo/api/breeds/list/all", { cache: true });
  if (dogsData.message) {
    for (let type in dogsData.message) {
      let dog = {
        id: type,
        type: type,
        subtypes: dogsData.message[type]
      };
      dog.n_types = dog.subtypes.length + 1;
      if (dog.subtypes) {
        dog.breeds = [];
        if (dog.subtypes.length) {
          // add type + subtype
          for (let subtype of dog.subtypes) {
            dog.breeds.push({ type: [dog.type, subtype] });
          }
        } else {
          // add only type, no subtype!
          dog.breeds.push({ type: [dog.type] });
        }
      }
      // images
      for (let breed of dog.breeds) {
        let num = 1;
        let imgsData = await http_get(`https://dog.ceo/api/breed/${breed.type.join("/")}/images/random/${num}`, {
          cache: true
        });
        if (imgsData && imgsData.message) {
          breed.images = imgsData.message;
        }
      }
      // save
      dogBlogs.push(dog);
    }
    // sort blog items
    // sort_objects_by_property(dogBlogs, "n_types");
  }

  return {
    props: { dogs: dogBlogs } // will be passed to the page component as props
  };
}
