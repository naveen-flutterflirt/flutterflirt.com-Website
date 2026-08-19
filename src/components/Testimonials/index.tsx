export default function Testimonials() {
  return (
    <section className="bg-[#edf5ff] px-6 pb-20 pt-8 md:px-10 lg:px-16">
      <div className="mx-auto max-w-[1600px]">

        {/* Top separator */}
        <div className="mb-12 border-t border-dashed border-[#b8d2ff]" />

        {/* Testimonial Card */}
        <div
          className="
            rounded-[22px]
            border
            border-[#dce7f4]
            bg-white
            px-8
            py-10
            md:px-10
            md:py-11
            lg:px-10
          "
        >
          {/* Testimonial content */}
          <div className="flex gap-5">
            {/* Quote mark */}
            <div
              className="
                shrink-0
                pt-1
                font-serif
                text-[42px]
                font-bold
                leading-none
                text-[#ef3d3d]
              "
            >
              “
            </div>

            {/* Text */}
            <p
              className="
                max-w-[1350px]
                text-[16px]
                font-normal
                leading-[1.55]
                text-[#1f2d43]
                md:text-[20px]
                lg:text-[22px]
              "
            >
              FlutterFlirt simplified our operations and gave us a single
              source of truth across ERP, CRM, and reporting. The team
              delivered on time and stayed with us through every stage.
            </p>
          </div>

          {/* Author */}
          <div className="mt-7 flex items-center gap-5">

            {/* Avatar */}
            <div
              className="
                h-[68px]
                w-[68px]
                shrink-0
                overflow-hidden
                rounded-full
                bg-[#d9dee5]
              "
            >
              <img
                src="avatar.webp"
                alt="Ava Chen"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Author information */}
            <div>
              <h3
                className="
                  text-[18px]
                  font-semibold
                  leading-tight
                  text-[#1f2d43]
                "
              >
                Ava Chen
              </h3>

              <p
                className="
                  mt-1
                  text-[16px]
                  leading-tight
                  text-[#7185a2]
                "
              >
                Director of Operations • Northwind
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}