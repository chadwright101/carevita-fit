import PageItemHeroSlider from "@/app/_components/sliders/page-item-hero-slider";

import data from "@/app/data/general-data.json";

import "@/app/styles/partials/pages/home.module.scss";
import About from "./_components/pages/home/about";
import Testimonials from "./_components/pages/home/testimonials";

const {
  homePage: {
    hero: { images, paragraph },
  },
} = data;

export default function Home() {
  return (
    <main>
      <section className="hero-section">
        <PageItemHeroSlider imageList={images} />
        <div className="hero-text">
          <h2 className="white-text">{paragraph[0]}</h2>
          <h2 className="white-text">{paragraph[1]}</h2>
        </div>
      </section>
      <About />
      <Testimonials />
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi nulla
        repudiandae quasi suscipit at quis officiis est eveniet quia? Esse
        molestias odio at exercitationem sapiente eveniet error doloribus
        deserunt earum et vitae officiis quod animi soluta perferendis
        necessitatibus sint distinctio accusamus ab, autem doloremque. Ratione
        asperiores perspiciatis explicabo itaque iure quas ipsum et nostrum
        sapiente. Autem veritatis in et repudiandae est deleniti vitae? Deleniti
        earum ea molestias! Ipsam accusantium laboriosam est distinctio, alias
        reprehenderit eius sunt fugiat nemo! Quis rerum quisquam perferendis
        quod ipsa assumenda dolores aspernatur vel fugiat! Totam ex harum
        adipisci hic culpa incidunt ratione fugit praesentium excepturi,
        repellat at. Officiis quibusdam maxime aliquam laboriosam provident
        architecto accusantium, at, unde odio obcaecati voluptates ratione
        corrupti quaerat minus tenetur. Debitis quasi at vitae distinctio
        praesentium, iure non aliquam beatae quod quos doloremque facilis
        explicabo itaque ut nisi soluta ex eveniet dicta aspernatur sint
        commodi? Nulla, a ad laudantium illum, laboriosam voluptates inventore
        eos non animi aliquam vero ea quibusdam unde voluptatem nihil, minus
        expedita! Adipisci doloribus, et corporis iste tempora reprehenderit
        necessitatibus sed praesentium? Tempore rem assumenda quia sunt quos
        alias commodi, vero nisi illum, veniam minima, tempora adipisci
        obcaecati. Nihil blanditiis nostrum laborum repellat odit repudiandae
        vitae obcaecati aliquam debitis illum officiis quis qui, eveniet, fuga
        temporibus voluptas corporis, voluptatem praesentium impedit sint
        suscipit! Porro minima possimus labore cumque? In, possimus aut placeat
        nostrum aliquam praesentium temporibus laudantium animi sapiente nobis
        odit, inventore esse voluptatem, optio veritatis! Corrupti similique
        alias ut eveniet nihil nobis inventore, dolores qui dolor cumque
        officiis maiores sequi perferendis. Provident repellat odio omnis
        voluptatibus iure. Quisquam odit voluptatibus tempora culpa labore
        aliquam minima nihil quidem facere illum odio distinctio ab molestias,
        soluta perferendis consequatur vero voluptatum voluptates illo saepe
        nobis pariatur nam. Excepturi est possimus ad repellat similique quod
        cum quaerat voluptatem fugit nisi. Error minus repudiandae eligendi
        porro incidunt minima perspiciatis dolorem ut, labore blanditiis
        molestias voluptatum nemo tempore nisi accusantium architecto totam
        vero. Quia vero repellat, ut ducimus unde alias numquam cumque. Deserunt
        impedit in unde qui ullam commodi ea voluptatibus aspernatur nobis
        quidem aperiam quia enim, nemo nam voluptas beatae laboriosam incidunt
        eos sit fuga eaque minima? Commodi hic consectetur distinctio laboriosam
        suscipit ducimus impedit autem, accusamus excepturi voluptatem! Maiores,
        reiciendis laboriosam? Est rerum placeat mollitia adipisci explicabo
        impedit non doloribus, officia voluptatum recusandae pariatur optio
        numquam quis sed sequi tempora. Perspiciatis omnis, quos sequi
        consectetur assumenda et vel illum corrupti voluptatibus ea magni amet
        aperiam nesciunt vitae? Vel eveniet obcaecati asperiores mollitia
        delectus esse quis tempore aliquid, quod itaque quam, incidunt amet
        optio dolorum nobis fugit sapiente? Aliquam maxime exercitationem
        accusamus ullam reprehenderit autem quo distinctio officia tempora eos
        fugit necessitatibus tenetur placeat suscipit atque voluptate fuga
        minima repudiandae eligendi beatae, quae accusantium facere aperiam.
        Molestias, sint et? Nostrum autem quis consequuntur laborum accusantium
        dicta, velit corrupti earum repudiandae ducimus asperiores animi,
        consectetur impedit recusandae labore in aspernatur. Ipsam corrupti
        asperiores molestias magnam perferendis soluta consectetur tempora,
        autem, nulla debitis, nobis maxime iusto voluptates voluptatibus ipsum
        ut dolores laboriosam libero.
      </p>
    </main>
  );
}
