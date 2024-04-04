import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-3xl p-10 rounded-md">
        {registerErrors.map((error, i) => (
          <div className="bg-red-500 p-2 text-white" key={i}>
            {error}
          </div>
        ))}

        <h1 className="text-2xl font-bold mb-2">Registro</h1>
        <form onSubmit={onSubmit} className="grid grid-cols-2 gap-6">
          <div>
            <input
              type="text"
              {...register("username", { required: true })}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              placeholder="Username"
            />
            {errors.username && (
              <p className="text-red-500">Username is required</p>
            )}

            <input
              type="email"
              {...register("email", { required: true })}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              placeholder="Email"
            />
            {errors.email && <p className="text-red-500">Email is required</p>}

            <input
              type="password"
              {...register("password", { required: true })}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-red-500">Password is required</p>
            )}

            <input
              type="tel"
              {...register("numeroTelefono", { required: true })}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              placeholder="Phone Number"
            />
            {errors.numeroTelefono && (
              <p className="text-red-500">Phone Number is required</p>
            )}

            <input
              type="text"
              {...register("rut", { required: true })}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              placeholder="Rut"
            />
            {errors.rut && <p className="text-red-500">Rut is required</p>}

            <input
              type="date"
              {...register("fechaNacimiento", { required: true })}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              placeholder="Date of Birth"
            />
            {errors.fechaNacimiento && (
              <p className="text-red-500">Date of Birth is required</p>
            )}
          </div>

          <div>
            <input
              type="text"
              {...register("sexo", { required: true })}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              placeholder="Gender"
            />
            {errors.sexo && <p className="text-red-500">Gender is required</p>}

            <input
              type="text"
              {...register("direccion", { required: true })}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              placeholder="Address"
            />
            {errors.direccion && (
              <p className="text-red-500">Address is required</p>
            )}

            <input
              type="text"
              {...register("region", { required: true })}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              placeholder="Region"
            />
            {errors.region && <p className="text-red-500">Region is required</p>}

            <input
              type="text"
              {...register("comuna", { required: true })}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              placeholder="Commune"
            />
            {errors.comuna && (
              <p className="text-red-500">Commune is required</p>
            )}

            <input
              type="text"
              {...register("provincia", { required: true })}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              placeholder="Province"
            />
            {errors.provincia && (
              <p className="text-red-500">Province is required</p>
            )}
          </div>

          <button
            type="submit"
            className="col-span-2 bg-sky-700 p-2 rounded-md mt-4 mb-4"
          >
            Register
          </button>
        </form>
        <p className="flex gap-x-2 justify-between">
          Already have an account?
          <Link to="/login" className="text-sky-500">
            {" "}
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
