# **UniVerSee**
მომავალი სტუდენტების გზამკვლევი უნივერსიტეტებში

ეს პროექტი შეიქმნა GDG ქუთაისის ჰაკათონის - "Explore &amp; Design" ფარგლებში. პროგრამის მიზანია, დაეხმაროს აბიტურიენტებს, შეიქმნან წარმოდგენა სხვადასხვა უნივერსიტეტებში არსებულ თითოეულ სასწავლო პროგრამაზე, გაეცნონ კურიკულუმის თითოეული საგნის აღწერას მათთვის გასაგებ ენაზე (წინარე ცოდნის გარეშე), ნახონ რომელ ფაკულტეტებზე აბარებენ მათი გემოვნების ადამიანები და წაიკითხონ უნივერსიტეტის წარმატებული სტუდენტების აზრი თითოეული საგნისა და მათ სასწავლად საუკეთესო მეთოდების შესახებ.

## **ლოკალურად გაშვება**

კოდის ლოკალურად (დოკერის გარეშე) გამოსაყენებლად ამ თანმიმდევრობით გაუშვით: 

1. ```pip3 install -r requirements.txt```
2. ```python3 data_loader.py```
3. ```python3 train/train.py```
4. ```python3 inference/run_inference.py```

## **Docker**

იმ შემთხვევაში, თუ დაყენებული გაქვთ Docker, ამ თანმიმდევრობით გაუშვით:

1. ```docker build -f train/Dockerfile -t universee_train .```
2. ```docker run -v $(pwd)/data:/app/data -v $(pwd)/models:/app/models universee_train```
3. ```docker build -t universee_inference -f inference/Dockerfile .```
4. ```docker run -p 8197:8197 -v ./predictions:/app/predictions universee_inference```
