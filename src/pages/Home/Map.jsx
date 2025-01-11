import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Map = () => {
  // Your specific location
  const myLocation = [23.81696259953591, 90.4103564457288];
  const myAddress = "Gulshan, Dhaka, Bangladesh";

  return (
    <div className="w-full h-[65vh] relative overflow-hidden z-20">
       <h2 className="text-center text-3xl font-medium mb-6">Our Location</h2>
      <MapContainer
        center={myLocation}
        zoom={15}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        {/* Luxurious TileLayer (optional: can be replaced with other map providers) */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" // OpenStreetMap basic layer
          attribution="&copy; OpenStreetMap contributors"
        />
        
        {/* Marker with default icon */}
        <Marker position={myLocation}>
          <Popup>{myAddress}</Popup>
        </Marker>
      </MapContainer>

      {/* Optional overlay text */}
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 text-white text-center z-10">
        <h3 className="text-3xl font-semibold tracking-wider">Our Location</h3>
        <p className="mt-2 text-lg md:text-xl shadow-md">
          Find us at this premium location in the heart of Dhaka.
        </p>
      </div>

      {/* Optional subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-30 z-0"></div>
    </div>
  );
};

export default Map;
