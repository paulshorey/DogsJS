import styled from "styled-components";

export const MainStyled = styled.main`
  padding: 4rem 0;
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
    text-align: center;
    display: block;
    h2 {
      margin: 0.5rem 0;
    }
  }
  section {
    margin-top: 1rem;
    width: calc(100vw - 2rem);
  }
  article {
    margin-bottom: 3rem;
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
