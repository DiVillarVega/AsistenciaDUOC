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