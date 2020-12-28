import { http_get } from "@twodashes/node/cjs/requests";
import { sort_objects_by_property } from "@twodashes/universal/cjs/sort_objects";
import Head from "next/head";
import Link from "next/link";
import { MainStyled } from "src/pages.styled/dogs";

export default function Home({ dogs = [] }) {
  return (
    <div className="container">
      <Head>
        <title>All the dogs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainStyled className="main">
        <h2>All the dogs:</h2>
        <p>
          Scroll down for many more! <span style={{ textShadow: "0 1px 1px rgba(0,0,0,0.5)" }}>👇</span> Click each type
          for more info and more photos{" "}
        </p>
        <section>
          {dogs.map((dog) => {
            return (
              <article>
                <h3>
                  <Link key={dog.type} className="blogitem" href={`/dogs/${dog.type}`}>
                    <a>{dog.type}s</a>
                  </Link>
                </h3>
                {/*<p className="preview">{dog.subtypes.join(", ")}</p>*/}
                {getDogImages(dog)}
                <hr />
              </article>
            );
          })}
        </section>
      </MainStyled>
    </div>
  );
}

function getDogImages(dog) {
  if (!dog.breeds || !dog.breeds[0] || !dog.breeds[0].images || !dog.breeds[0].images[0]) return null;
  let Images = [];
  for (let breed of dog.breeds) {
    Images.push(
      <Link className="subtypesImage" key={breed.type.toString()} href={`/dogs/${breed.type.join("/")}`}>
        <a>
          <span className="subtypesImage" key={breed.type.toString()}>
            <img src={breed.images[0]} title={[...breed.type].reverse().join(" ")} height="150" />
            <span className="breedImageCaption">{!!breed.type[1] && breed.type[1]}</span>
          </span>
        </a>
      </Link>
    );
  }
  return Images;
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
    sort_objects_by_property(dogBlogs, "n_types");
  }

  return {
    props: { dogs: dogBlogs } // will be passed to the page component as props
  };
}
