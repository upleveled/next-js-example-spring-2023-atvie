export default function AboutPage() {
  // This is a JS object
  const myComplexObject = { name: 'Kimberley', hobby: 'cooking' };

  // This is a JS string
  const myComplexObjectAsString = JSON.stringify(myComplexObject);

  // This is a JS object
  const myComplexObjectIntoJSAgain = JSON.parse(myComplexObjectAsString);

  return (
    <>
      <h1>JSON Stringify And Parse</h1>
      {JSON.stringify([undefined, false, '', null])}
      {JSON.stringify(false)}
      <br />
      {myComplexObjectIntoJSAgain.name}
    </>
  );
}
