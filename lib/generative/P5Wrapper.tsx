import p5 from "p5";
import React, { createRef, useEffect, useState } from "react";

interface Props {
  sketch: any
  update: boolean
  save: boolean
  onClickSave: (blob: Blob | null) => void
}

export const P5Wrapper: React.VFC<Props> = ({sketch, update, save, onClickSave}) => {
  const [instance, setInstance] = useState<p5>();
  const wrapper = createRef<HTMLDivElement>();


  useEffect(() => {
    if (wrapper.current === null) return;
    setInstance(new p5(sketch, wrapper.current));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sketch]);

  useEffect(() => {
    if(instance && update) {
      instance.redraw()
    }
  },[update])

  useEffect(() => {
    async function getImageBuffer() {
      if(instance && save) {
        // instance.saveCanvas('my-hoodie-mon','png')
        if(wrapper.current?.hasChildNodes){
          const canvas = wrapper.current.firstChild as HTMLCanvasElement
          // const uri = canvas.toDataURL()
          canvas.toBlob(async function(result) {
              onClickSave(result)
          }, 'image/jpeg');
        }
      }
    }

    getImageBuffer()
  },[save])

  return <div className="mx-auto " ref={wrapper} />
};

export default P5Wrapper;