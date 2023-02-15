import React from "react";
import { useState, useEffect } from "react";
import { useGoogleMaps } from "react-hook-google-maps";

export default function RouteMap({
  startingPoint,
  endingPoint,
  travelMode,
  handleAddRow,
  updateStartEndPosition,
  preRenderMarkers = false,
}) {
  const [markers, setMarkers] = useState([]);
  const { ref, map, google } = useGoogleMaps(
    "AIzaSyAoyevYqWkjKEJjq6vPXzfhulxkIecZhX0",
    {
      zoom: 6,
      center: startingPoint,
    }
  );

  // useEffect(() => {
  //   if (preRenderMarkers) {
  //     const directionsService = new google.maps.DirectionsService();
  //     const directionsRenderer = new google.maps.DirectionsRenderer();
  //     directionsRenderer.setMap(map);

  //     const origin = startingPoint;
  //     const destination = endingPoint;

  //     console.log(origin);
  //     console.log(destination);
  //     console.log(travelMode);

  //     const request = {
  //       origin: origin,
  //       destination: destination,
  //       travelMode: travelMode,
  //     };

  //     directionsService.route(request, (result, status) => {
  //       console.log(status);
  //       console.log(result);
  //       if (status === "OK") {
  //         directionsRenderer.setDirections(result);
  //       }
  //     });
  //   }
  // }, [preRenderMarkers, google, map]);

  useEffect(() => {
    if (map) {
      const listener = map.addListener("click", (e) => {
        setMarkers((prevMarkers) => {
          let color;
          if (prevMarkers.length === 0) {
            color = "black";
          } else if (prevMarkers.length === 1) {
            color = "red";
          } else {
            color = "yellow";
          }

          return [
            ...prevMarkers,
            {
              position: {
                lat: e.latLng.lat(),
                lng: e.latLng.lng(),
              },
              color,
            },
          ];
        });
      });

      if (preRenderMarkers) {
        const directionsService = new google.maps.DirectionsService();
        const directionsRenderer = new google.maps.DirectionsRenderer();
        directionsRenderer.setMap(map);

        const origin = startingPoint;
        const destination = endingPoint;

        console.log(origin);
        console.log(destination);
        console.log(travelMode);

        const request = {
          origin: origin,
          destination: destination,
          travelMode: travelMode,
        };

        directionsService.route(request, (result, status) => {
          console.log(status);
          console.log(result);
          if (status === "OK") {
            directionsRenderer.setDirections(result);
          }
        });
      }

      return () => {
        google.maps.event.removeListener(listener);
      };
    }
  }, [map, google]);

  useEffect(() => {
    if (markers.length >= 3) {
      console.log("handleAddRow");
      if (handleAddRow) handleAddRow(markers[markers.length - 1].position);
    }
    if (map && markers.length >= 2) {
      console.log("Calculate Distance");
      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer();
      directionsRenderer.setMap(map);

      const origin = markers[0].position;
      const destination = markers[1].position;

      // console.log(origin);
      // console.log(destination);
      // console.log(travelMode);

      const request = {
        origin: origin,
        destination: destination,
        travelMode: travelMode,
      };
      directionsService.route(request, (result, status) => {
        if (status === "OK") {
          directionsRenderer.setDirections(result);
        }
      });

      if (updateStartEndPosition) updateStartEndPosition(origin, destination);
    }
  }, [map, markers, travelMode]);

  const Marker = ({
    index,
    position,
    map,
    color,
    onPositionChange,
    onRemove,
  }) => {
    const marker = new window.google.maps.Marker({
      position: position,
      map: map,
      draggable: true,
      icon: {
        path: "M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z",
        scale: 1,
        fillColor: color,
        fillOpacity: 1,
        strokeWeight: 0,
      },
    });

    return null;
  };

  return (
    <>
      <div style={{ height: "100vh", width: "100%" }}>
        <div ref={ref} style={{ height: "100vh", width: "100%" }} />
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={marker.position}
            map={map}
            color={marker.color}
          />
        ))}
      </div>
    </>
  );
}
