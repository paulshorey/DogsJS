import styled from "styled-components";

export const MainStyled = styled.main`
  padding: 0 0 3rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  hr {
    padding: 0;
    margin: 2rem 0 0.75rem 0;
  }
  h1 {
    text-transform: capitalize;
  }
  h3 {
    text-transform: capitalize;
    font-size: 1.5rem;
    line-height: 1.5rem;
    margin: 1rem 0;
  }
  header {
    text-align: left;
    display: block;
    background: hsl(39deg 97% 47%);
    color: #fff;
    width: 100%;
    padding: 0.75rem 0.25rem 0.75rem 1.25rem;
    > * {
      font-size: 1rem;
      line-height: 1rem;
      display: inline-block;
      padding: 0;
      margin: 0 0.5rem 0 0;
      font-weight: normal;
    }
  }
  section {
    margin-top: 1rem;
    width: calc(100vw - 2rem);
    text-align: center;
    article {
      margin: 1rem 0.5rem 0;
      display: inline-block;
      max-width: calc(100% - 2rem);
    }
  }
  a.breed-title-link {
    //text-decoration: none;
    //> * {
    //  text-decoration: underline;
    //}
    //&:hover {
    //  text-decoration: none;
    //  > * {
    //    text-decoration: none;
    //  }
    //}
    position: relative;
    .link-icon {
      text-decoration: none;
      font-size: 150%;
      opacity: 0.25;
      line-height: 50%;
      position: absolute;
      top: calc(50% - 0.5rem);
      padding: 0 0.33rem;
    }
  }
  /*
   * each slide
   */
  .slide {
    position: relative;
    border: solid 0.25rem white;
    display: inline-flex;
    box-sizing: border-box;
    .slideImage {
      border-radius: 0.25rem;
    }
    .slideImageCaption {
      position: absolute;
      bottom: 0;
      left: 0;
      background: white;
      text-transform: capitalize;
      padding-right: 0.25rem;
      border-top-right-radius: 0.25rem;
    }
  }
  /*
   * next/image
   */
  .nextImage {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: auto;
    right: 0;
    bottom: 0;
    object-fit: cover;
    object-position: center;
  }
`;
