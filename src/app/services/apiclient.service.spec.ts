import { TestBed } from "@angular/core/testing";
import { HttpClientModule } from "@angular/common/http";
import { APIClientService } from "./apiclient.service";
import { Post } from "../model/post";
import { create, newspaper } from "ionicons/icons";

describe('Pruebas de API Client Service', () => {
  let service: APIClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [APIClientService]
    }); 
    service = TestBed.inject(APIClientService);
  });
  it('La API debería obtener todas las publicaciones', async () => {
    const posts = await service.fetchPosts();

    expect(posts).withContext('No se obtuviero correctamente las publicaciones').toBeTruthy();
    expect(posts.length).withContext('No se encontraron publicaciones').toBeGreaterThan(0);

    const firstPost = posts[0];
    expect(firstPost).toBeDefined;
    expect(firstPost).toEqual(jasmine.objectContaining({
      id: jasmine.any(String),
      title  : jasmine.any(String),
      body: jasmine.any(String),
    }));
  })

  it('Debería crear una nueva publicación', async () => {
    
    const newPost = {
      id: -1,
      title: 'Publicación de prueba',
      body: 'Contenido nuevo',
      author: 'Ana Torres',
      date: '01/01/2000',
      authorImage: 'atorres.jpg'
    }
    const createdPost = await service.createPost(newPost);

    expect(createdPost).withContext('No se logró crear la publicación').toBeTruthy();

    if (createdPost) {
    expect(createdPost.title).toEqual(newPost.title);
    expect(createdPost!.body).toEqual(newPost.body);
    expect(createdPost!.author).toEqual(newPost.author);
    expect(createdPost!.date).toEqual(newPost.date);
    expect(createdPost!.authorImage).toEqual(newPost.authorImage);

    alert(`Fue creada la publicación: "${createdPost.title}" exitosamente`)
    }
  })

  it('Debería actualizar una publicación', async () => {
    
    const postToUpdate = {
      id: 1,
      title: `Publicación de prueba ${Math.floor(Math.random()*1000)}`,
      body: 'Contenido nuevo',
      author: 'Ana Torres',
      date: '01/01/2000',
      authorImage: 'atorres.jpg'
    }
    const updatedPost = await service.updatePost(postToUpdate);

    expect(updatedPost).withContext('No se logró actualizar la publicación').toBeTruthy();

    if (updatedPost) {
    expect(updatedPost.title).toEqual(postToUpdate.title);

    alert(`Fue actualiada la publicación: "${updatedPost.title}" exitosamente`)
    }
  })

  it('Debería eliminar una publicación', async () => {
    const deleteResponse = await service.deletePost(2);
    expect(deleteResponse).toBeDefined();
    if (deleteResponse){
      alert('La publicación 2 fue eliminada correctamente');
    } else {
      alert('La publicación 2 no existe');
    }
  })
});