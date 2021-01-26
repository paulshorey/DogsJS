import { http_get } from "@twodashes/node/cjs/requests";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { str_capitalize } from "@twodashes/universal/umd/string";
import { MainStyled } from "src/styled_components/dogs";

export default function Home({ dog = {} }) {
  let type = str_capitalize(dog.type);
  let subtype = str_capitalize(dog.subtype);
  return (
    <div className="container">
      <Head>
        <title>
          {subtype} {type}
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainStyled className="main">
        <p>
          <Link href="/dogs">
            <a>👈👈 back all dogs</a>
          </Link>
          &nbsp;&nbsp;
          <Link href={"/dogs/" + dog.type}>
            <a>👈 back to {type}s</a>
          </Link>
        </p>
        <h1>
          {subtype} {type}
        </h1>
        {getDogImages(dog)}
      </MainStyled>
    </div>
  );
}

function getDogImages(breed) {
  if (!breed || !breed.images || !breed.images.map) return null;
  return breed.images.map((img, i) => (
    <span key={i} className="slide">
      <Image
        className="slideImage nextImage"
        title={[...breed.type].reverse().join(" ")}
        height="400"
        width="400"
        src={img}
      />
    </span>
  ));
}

export async function getStaticPaths() {
  /*
   * Get all dogs (paths)
   */
  let dogPaths = [];
  let dogsData = await http_get("https://dog.ceo/api/breeds/list/all", { cache: true });
  if (dogsData.message) {
    for (let type in dogsData.message) {
      let subtypes = dogsData.message[type];
      if (subtypes.length) {
        for (let subtype of subtypes) {
          dogPaths.push({
            params: {
              type: type,
              subtype: subtype
            }
          });
        }
      }
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
    type: params.type,
    subtype: params.subtype
  };
  let type = [dog.type];
  if (dog.subtype) {
    type.push(dog.subtype);
  }
  let imgsData = await http_get(`https://dog.ceo/api/breed/${type.join("/")}/images/random/12`, { cache: true });
  if (imgsData && imgsData.message) {
    dog.images = imgsData.message;
  }
  return {
    props: { dog } // will be passed to the page component as props
  };
}
