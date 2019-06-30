#include <nan.h>

namespace __nan_hello__ {
    using v8::String;
    using v8::Value;
    using v8::Local;
    using v8::Function;
    using v8::Array;
    using v8::Object;
    using v8::Number;
    using v8::FunctionTemplate;
    using v8::FunctionCallbackInfo;

    
    
    NAN_METHOD(hello) {
        if (info.Length() < 1) {
            Nan::ThrowError("wrong number of argument");
            return;
        }
        info.GetReturnValue().Set(info[0]);
    }
    
    void Map(const Nan::FunctionCallbackInfo<Value>& args) {
//    NAN_METHOD(map) {
        Local<Array> array = args[0].As<Array>();
        Local<Function> func = args[1].As<Function>();
        
        Local<Array> ret = Nan::New<Array>(array->Length());
        
        Local<Value> null = Nan::Null();
        Local<Value> a[3] = {Nan::New<Object>(), null, array};
        for (uint32_t i=0; i<array->Length(); i++) {
            a[0] = array->Get(i);
            a[1] = Nan::New<Number>(i);
           Local<Value> v = func->Call(args.This(), 3, a);
            // func->Call(args.This(), 3, a);
            ret->Set(i, v);
        }
        args.GetReturnValue().Set(ret);
    }
    
    NAN_MODULE_INIT(Init) {
        Nan::Set(target,
                 Nan::New<String>("hello").ToLocalChecked(),
                 Nan::GetFunction(Nan::New<FunctionTemplate>(hello)).ToLocalChecked());
        Nan::Export(target, "map", Map);
    }
    NODE_MODULE(addon, Init);
}
