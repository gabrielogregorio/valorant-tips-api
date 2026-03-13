interface UpdateMapPresenterInputInterface {
  id: string;
  name: string;
  imageUrl?: string;
}

export interface UpdateMapViewModelOutputInterface {
  id: string;
  name: string;
  imageUrl: string | null;
}

export class UpdateMapPresenter {
  static toViewModel(output: UpdateMapPresenterInputInterface): UpdateMapViewModelOutputInterface {
    return {
      id: output.id,
      imageUrl: output.imageUrl ?? null,
      name: output.name,
    };
  }

  static toViewModelList(output: UpdateMapPresenterInputInterface[]): UpdateMapViewModelOutputInterface[] {
    return output.map(UpdateMapPresenter.toViewModel);
  }
}
