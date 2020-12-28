import { http_get } from "@twodashes/node/cjs/requests";
import { str_capitalize } from "@twodashes/universal/cjs/string";
import Head from "next/head";
import Link from "next/link";
import { MainStyled } from "../styled.js";

export default function Home({ dog = {} }) {
  let breeds = dog.breeds || [];
  let type = str_capitalize(dog.type);
  return (
    <div className="container">
      <Head>
        <title>
          {breeds.length > 1 && "Types of "}
          {type}
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainStyled className="main">
        <p>
          <Link href="/dogs">👈 back all dogs</Link>
        </p>
        <h2>
          {breeds.length > 1 && "Types of "}
          <span className="capitalized">{type}</span>
        </h2>
        {breeds.length > 1 && (
          <p>
            Click each one to see more photos <span style={{ textShadow: "0 1px 1px rgba(0,0,0,0.5)" }}>👇</span>
          </p>
        )}
        <>
          {breeds.map((breed) => {
            return (
              <Link key={breed.type.toString()} className="blogitem" href={`/dogs/${breed.type.join("/")}`}>
                <article>
                  <h3>{[...breed.type].reverse().join(" ")}</h3>
                  {getBreedImages(breed)}
                </article>
              </Link>
            );
          })}
        </>
      </MainStyled>
    </div>
  );
}

function getBreedImages(breed) {
  if (!breed || !breed.images || !breed.images.map) return null;
  return breed.images.map((img, i) => <img key={i} src={img} height="300" />);
}

export async function getStaticPaths() {
  /*
   * Get all dogs (paths)
   */
  let dogPaths = [];
  let dogsData = await http_get("https://dog.ceo/api/breeds/list/all", { cache: true });
  if (dogsData.message) {
    for (let type in dogsData.message) {
      dogPaths.push({
        params: {
          type: type
        }
      });
    }
  }
  return {
    paths: dogPaths,
    fallback: false
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  let dog = {
    type: params.type
  };
  let breedsData = await http_get(`https://dog.ceo/api/breed/${params.type}/list`, { cache: true });
  if (breedsData && breedsData.message) {
    dog.subtypes = breedsData.message;

    // breeds
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
      if (dog.breeds.length === 1) {
        num = 12;
      }
      let imgsData = await http_get(`https://dog.ceo/api/breed/${breed.type.join("/")}/images/random/${num}`, {
        cache: true
      });
      if (imgsData && imgsData.message) {
        breed.images = imgsData.message;
      }
    }
  }
  return {
    props: { dog } // will be passed to the page component as props
  };
}
